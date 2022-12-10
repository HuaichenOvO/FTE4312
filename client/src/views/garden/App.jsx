import React from 'react'
import { EthProvider } from "../../contexts/EthContext";
import GameFooter from "../../components/GameFooter";
import GameHeader from "../../components/GameHeader";
import Garden from "../../components/Garden";

function App() {
    return (
        <div id="App" >
            <div className="container">
                <GameHeader />
                <div className="container">
                    <EthProvider>
                        <Garden />
                    </EthProvider>
                </div>
                <GameFooter />
            </div>
        </div>
    );
}

export default App;