import React from 'react';
import httpRequest from '../Services/HttpService';
import config from '../config.json';
import { toast } from 'react-toastify';

class Post extends React.Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await httpRequest.get(config.url);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await httpRequest.post(config.url, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = 'Updated';
    await httpRequest.put(config.url + '/' + post.id, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = [...this.state.posts];
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
    try {
      await httpRequest.delete(config.url + '/' + post.id);
      // throw new Error('');
    } catch (ex) {
      if (ex.response && ex.response.status === 404) toast('Already deleted');
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    const { posts } = this.state;
    return (
      <div>
        <button className="btn btn-primary" style={{ marginBottom: 20 }} onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => this.handleUpdate(post)}>
                    Update
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => this.handleDelete(post)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Post;
