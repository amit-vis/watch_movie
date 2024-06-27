
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieList } from './component/movie-List/MovieList';
import { Provider } from "react-redux";
import { store } from './redux/store';
import { AddForm } from './component/FormSection/addForm';
import { EditForm } from './component/FormSection/editForm';
import { ShowDetails } from './component/showDetails/Details';
import { CreateReview } from './component/reviewSection/createReview';
import { EditReview } from './component/reviewSection/editReview';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MovieList />} />
            <Route path='add' element={<AddForm />} />
            <Route path='edit/:movieId' element={<EditForm />} />
            <Route path='details/:movieId' element={<ShowDetails />} />
            <Route path='create-review/:movieId' element={<CreateReview />} />
            <Route path='edit-review/:reviewId' element={<EditReview/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

