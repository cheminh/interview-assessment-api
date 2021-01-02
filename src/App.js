import logo from './logo.svg';
import Layout from './Layout';

import './App.css';
// import '@awesomecomponents/mux/core/typography/assets/fonts/fonts.css';
// import UtilityHeader from '@awesomecomponents/mux/core/components/UtilityHeader';

import ProvinceList from './components/ProvinceList';



function App() {
  return (
    // <div className="App">
    //   <UtilityHeader />
    //   <ProvinceList />
    // </div>
    <Layout>
        <ProvinceList />
    </Layout>
  );
}

export default App;
