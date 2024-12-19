import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import PostDetailsPage from './pages/PostDetails';
// import CreatePostPage from './pages/CreatePostPage';
// import EditPostPage from './pages/EditPostPage';
// import Footer from './components/Footer';
import Header from './components/Header';
import PostFormPage from './pages/PostForm';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-violet-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/post/:id" element={<PostDetailsPage />} />
            <Route path="/post-form" element={<PostFormPage />} />
            <Route path="/post-form/:id" element={<PostFormPage />} />

          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
