import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!author || !title || !summary || !content) {
      console.log("Please enter all the fields");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, title, summary, content })
      });
      if (!response.ok) throw new Error();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-black mb-12 text-center uppercase tracking-wider">Create a New Post</h1>
      <div className="max-w-4xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Author</label>
            <input
              type="text"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-black"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Title</label>
            <input
              type="text"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Summary</label>
            <textarea
              className="w-full border-2 border-gray-300 p-2 focus:outline-none focus:border-black rounded"
              rows="4"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-1">Description</label>
            <textarea
              className="w-full border-2 border-gray-300 p-4 focus:outline-none focus:border-black rounded resize-y min-h-[400px]"
              rows="20"
              value={content}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-black text-white py-3 px-6 hover:bg-gray-800 transition duration-300 text-sm uppercase tracking-wider rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;