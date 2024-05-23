import CreateDay from './component/CreateDay';
import CreateWord from './component/CreateWord';
import Day from './component/Day';
import DayList from './component/DayList';
import EmptyPage from './component/EmptyPage';
import Header from './component/Header';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' element={<DayList />} />
              <Route path='/day/:day' element={<Day />} />
              <Route path='/create_word' element={<CreateWord />} />
              <Route path='/create_day' element={<CreateDay />} />
              <Route path='*' element={<EmptyPage />} />
            </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
