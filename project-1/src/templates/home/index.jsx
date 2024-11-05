import { Component } from 'react';

import './style.css';

import { loadPosts } from '../../utils/loadPosts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
//Quando for importar alguma coisa que não é padrão, pensar no seguinte: 
//  import {alguma coisa} from 'algum lugar'

export class Home extends Component {
  //Utilizando class fields...
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 3,
    searchValue: ''
  };

  async componentDidMount() {//Quando o componente tiver sido carregado
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });

    /* .then(response=>response.json())
    .then(posts => this.setState({posts})) */

  }

  loadMorePosts = () => {
    //console.log('Load more posts chamado.')

    const {
      page,//0
      postsPerPage,//2
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);//... spread jscript

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {//método que Tem que retornar JSX.
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        )
      })

      : posts;

    return (
      <section className="container" >
        <div className="searchContainer">
          {!!searchValue && (
            <h1>Search Value: {searchValue}</h1>
          )}
          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}
        {filteredPosts.length === 0 && (
          <p>Posts não encontrados.</p>
        )}
        <div className="button-container">
          {!searchValue && (
            <Button
              text="Load More Posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>

      </section >
    )
  }

}



//Métodos de ciclo de vida: Assim que um componente terminar de montar na tela, acontece alguma coisa, como por exemplo, um console log "carregou".