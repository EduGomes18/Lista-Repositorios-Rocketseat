/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Container from '../../Component/Container';
import { Form, SubmitButton, List, Erro1, Head } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    load: false,
    error: null
  };

  // Carregar os dados no localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do localStorage

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
      erro: null
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ load: true, error: false });
    try {
      const { newRepo, repositories } = this.state;

      if (newRepo === '') throw 'Você precisa indicar um repositório';

      const hasRepo = repositories.find(r => r.name === newRepo);

      if (hasRepo) throw 'Repositório duplicado';

      const response = await api.get(`repos/${newRepo}`);

      const data = {
        name: response.data.full_name
      };
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        load: false
      });
    } catch (error) {
      this.setState({
        error: true
      });
    } finally {
      this.setState({ load: false });
    }
  };

  render() {
    const { newRepo, repositories, load, error } = this.state;

    return (
      <>
        <Head>
          <h1>Listagem de Repositórios do GitHub</h1>
        </Head>

        <Container>
          <h1>
            <FaGithubAlt />
            Repositórios
          </h1>
          <Form onSubmit={this.handleSubmit} error={error}>
            <input
              type="text"
              placeholder="Adicionar repositório"
              value={newRepo}
              onChange={this.handleInputChange}
            />
            <Erro1 error={error}>
              Você precisa indicar um repositório, ou este repositório já
              existe.
            </Erro1>
            <SubmitButton load={load}>
              {load ? (
                <FaSpinner color="#fff" size="14" />
              ) : (
                <FaPlus color="#FFF" size={14} />
              )}
            </SubmitButton>
          </Form>
          <List>
            {repositories.map(repository => (
              <li key={repository.name}>
                <span>{repository.name}</span>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
              </li>
            ))}
          </List>
        </Container>
      </>
    );
  }
}
