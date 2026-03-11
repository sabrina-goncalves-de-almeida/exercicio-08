import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [ibgeEstados, setIbgeEstados] = useState([]);
  const [ibgeCidades, setIbgeCidades] = useState([]);
  const [infoCidadeSelecionada, setInfoCidadeSelecionada] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [mostrarSelecaoCidades, setMostrarSelecaoCidades] = useState(false);
  const [mostrarInfoCidadeSelecionada, setMostrarInfoCidadeSelecionada] = useState(false);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const ibgeEstados = await response.json();
        setIbgeEstados(ibgeEstados);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchDados();
  }, []);

  useEffect(() => {
    const fetchDadosCidades = async () => {
      try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`);
        const ibgeCidades = await response.json();
        setIbgeCidades(ibgeCidades);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchDadosCidades();
  }, [estadoSelecionado]);

  return (
    <div className="App">
      <h1>Dados IBGE</h1>
      <h2>Escolha seu estado</h2>
      <select name="select" id="selectEstado" value={estadoSelecionado} onChange={(e) => {setEstadoSelecionado(e.target.value); setMostrarSelecaoCidades(true); setMostrarInfoCidadeSelecionada(false)}}>
        <option id='estadoDefault' value="default">Carregando estados...</option>
        {ibgeEstados.map((item) => (
          <option key={item.id} value={item.sigla}>{item.nome}</option>
        ))}
      </select>

      {mostrarSelecaoCidades && 
        <>
          <br />
          <br />
          <select name="select" id="selectCidade" value={cidadeSelecionada} onChange={(e) => setCidadeSelecionada(e.target.value)}>
            <option id='estadoDefault' value="default">Escolha uma cidade...</option>
            {ibgeCidades.map((i) => (
              <option key={i.id} value={i.sigla}>{i.nome}</option>
            ))}
          </select>
          <button onClick={()=>{
            setMostrarInfoCidadeSelecionada(true);
            let resultado = ibgeCidades.find(({nome})=> nome == cidadeSelecionada);
            setInfoCidadeSelecionada([resultado.nome, resultado.microrregiao.nome, resultado.microrregiao.nome]);
          }}>Ver mais</button>
        </>
      }


      {mostrarInfoCidadeSelecionada && 
        <>
          <br />
          <br />
          <p>Região: {infoCidadeSelecionada[0]}</p>
          <p>Microrregião: {infoCidadeSelecionada[1]}</p>
          <p>Mesorregião: {infoCidadeSelecionada[2]}</p>
        </>
      }
    </div>
  );
}

export default App;
