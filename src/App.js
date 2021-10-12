import './App.css';
import Header from './components/Header'
import MainContentContainer from './components/MainContentContainer'
import ImageComponent from './components/Image-details-component/ImageDetailsComponent'
function App() {
  return <>
  <div>
    <ImageComponent/>
    <Header/>
    <MainContentContainer/>
    
  </div>
  </>
  ;
}

export default App;
