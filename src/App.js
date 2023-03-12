import './App.css';
import CoreFactors from "./page/CoreFactors";
import SkillFactors from "./page/SkillFactors";
import Extra from "./page/Extra";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
     <CoreFactors/>
        <SkillFactors/>
        <Extra/>
    </div>
  );
}

export default App;
