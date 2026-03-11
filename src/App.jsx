import React, { useState, useEffect } from "react";
import './App.css';
// // https://servicodados.ibge.gov.br/api/v1/localidades/estados)
// // https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios)


// let cidadesData = null
// let cidades = null

// async function carregaEstados() {
//     const estadosData = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
//     const estados = await estadosData.json()
//     const selectEstados = document.getElementById('selectEstado')
//     estados.forEach(estado => {
//         const estadoOption = document.createElement('option')
//         estadoOption.innerText = estado.nome
//         estadoOption.value = estado.sigla
//         selectEstados.append(estadoOption)
//     });

//     const estadoDefault = document.getElementById('estadoDefault')
//     estadoDefault.innerText = 'Escolha seu estado'
    
// }


// async function selectCidadesEvent() {
//     const cidadeSelecionada = document.getElementById("selectCidadesList").value;
//     console.log('cidade selecionada ', cidadeSelecionada)
// }
// async function addCidadesList(sigla) {

//     const cabecalhoCidades = document.createElement('div')
//     cabecalhoCidades.id = 'selectCidade'
//     cabecalhoCidades.innerHTML = '<h2>Escolha a cidade desejada'
//     document.body.append(cabecalhoCidades)

//     const cidadeContainer = document.createElement('div');
//     cidadeContainer.id = 'cidadeContainer';

//     const selectCidades = document.createElement('select');
//     selectCidades.id = 'selectCidadesList'

//     cidadeContainer.append(selectCidades)

//     const cidadeDefault = document.createElement('option')
//     cidadeDefault.id = 'cidadeDefault'
//     cidadeDefault.value = 'default'
//     cidadeDefault.innerText = 'Carregando cidades'
//     selectCidades.append(cidadeDefault)

//     document.body.append(cidadeContainer)

//     cidadesData = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`)
//     cidades = await cidadesData.json()
//     console.log(cidades)

//     cidades.forEach(cidade => {
//         const cidadeOption = document.createElement('option')
//         cidadeOption.innerText = cidade.nome
//         cidadeOption.value = cidade.id
//         selectCidades.append(cidadeOption)
//     });
//     cidadeDefault.innerText = 'Escolha a cidade desejada '

//     document.getElementById('selectCidadesList').addEventListener('change', selectCidadesEvent)


//     const searchButtom = document.createElement('input')
//     searchButtom.type = 'submit'
//     searchButtom.value = 'Ver mais'
//     searchButtom.id = 'verMais'
//     cidadeContainer.append(searchButtom)

//     document.getElementById('verMais').addEventListener('click', selectCidades => {
//         const cidade = document.getElementById('selectCidadesList').value

//         let dados = document.getElementById('predata')
//         if(dados === null){
//             dados = document.createElement('pre')
//             dados.id = 'predata'
//         }
        
//         if(cidade === 'default') {
//             dados.innerHTML = ''
//             return
//         }

//         const cidadeItem = cidades.find(e => e.id == cidade)



//         dados.innerHTML = `
//         Regiao: ${cidadeItem.nome}
//         Microregiao: ${cidadeItem.microrregiao.nome}
//         Mesoregião: ${cidadeItem.microrregiao.mesorregiao.nome}
//         `

//         document.body.append(dados)
//     }, )
// }

// async function selectEstado() {

    

//     const estadoSelecionado = document.getElementById("selectEstado").value;
//     let selectCidadeExist = !!document.getElementById("selectCidade")
//     if(selectCidadeExist) {
//         document.getElementById('selectCidade').removeEventListener('change', selectCidadesEvent)
//         document.getElementById("selectCidade").remove()
//     }
//     selectCidadeExist = !!document.getElementById('selectCidadesList')
//     if(selectCidadeExist) document.getElementById("selectCidadesList").remove()

//     selectCidadeExist = !!document.getElementById('verMais')
//     if(selectCidadeExist) document.getElementById("verMais").remove()

//     selectCidadeExist = !!document.getElementById('predata')
//     if(selectCidadeExist) document.getElementById("predata").remove()
    
//     if (estadoSelecionado === 'default') return

//     addCidadesList(estadoSelecionado)

// }

// window.addEventListener('load', carregaEstados)
// document.getElementById('selectEstado').addEventListener('change', selectEstado)




function ConectWithIBGE({roomId}){
  const [ibgeEstados, setIbgeEstados] = useState([]);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const ibgeEstados = await response.json();
        setDados(ibgeEstados);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchDados();
  }, []);

  return (
    <>
      <label>
        Server URL:{' '}
        <input
          value={ibgeEstados}
          onChange={e => setIbgeEstados(e.target.value)}
        />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}

function App() {
  const [ibgeEstados, setIbgeEstados] = useState([]);
  const [ibgeCidades, setIbgeCidades] = useState([]);
  const [mostrar, setMostrar] = useState(false);

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
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios');
        const ibgeCidades = await response.json();
        setIbgeCidades(ibgeCidades);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchDadosCidades();
  }, []);
  return (
    <div className="App">
      <h1>Dados IBGE</h1>
      <h2>Escolha seu estado</h2>
      <select name="select" id="selectEstado">
          <option id='estadoDefault' value="default">Carregando estados...</option>
          {ibgeEstados.map((item) => (
            <option key={item.id}>{item.nome}</option>
          ))}
      </select>

      {/* 2. Botão que altera o estado ao clicar */}
      <button onClick={() => setMostrar(true)}>
        Mostrar Elemento
      </button>

      {/* 3. Renderização condicional: exibe apenas se 'mostrar' for true */}
      {mostrar && <div>Elemento renderizado!</div>}
      
      
    </div>
  );
}

export default App;
