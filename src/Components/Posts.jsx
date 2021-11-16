import React from 'react';
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/posts';

class Post extends React.Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(url);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: 'a', body: 'b' };
    const { data: post } = await axios.post(url, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = 'Updated';
    await axios.put(url + '/' + post.id, post);

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
      await axios.delete(url + '/' + post.id);
      throw new Error('');
    } catch (ex) {
      alert('Something went wrong!');
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
