"use client"
import { useState } from "react";
import Swal from 'sweetalert2'

export default function Home() {

  const opc1 = [
    "Escolha uma opção",
    "Serviço",
    "Produto"
  ]

  const [form, setForm] = useState({
    'nmresponsavel':"",
    'nmempresa':"",
    'area':"",
    'logo':"",
    'fone':"",
    'email':"",
    'servicoproduto':"",
    'outroservicoproduto':"",
    'comentarios':""
  })

  const onChange = (evt:any) =>{
      const value = evt.target.value
      console.log(evt.target.value)
      const key = evt.target.name
      setForm(old => ({
          ...old,
          [key]:value
      }))
  }

  const handleSubmit = async (e:any) =>{
    e.preventDefault()
    try{
      fetch('https://sheetdb.io/api/v1/g6pzaqljw9h87?sheet=cliente',{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          data:[{
            'Nome do responsavel':form.nmresponsavel,
            'Nome da empresa':form.nmempresa,	
            'Area de seguimento':form.area,	
            'Possui logo':form.logo,
            'Telefone':form.fone,
            'E-mail':form.email,
            'Serviço ou produto':form.servicoproduto,
            'Outro produto ou serviço':form.outroservicoproduto,
            'comentarios':form.comentarios
          }]
        })
      })
      .then((response) => response.json())
      .then((data) => console.log(data));

      console.log(form)

      Swal.fire({
        icon: "success",
        title: "Enviado com Sucesso",
        text: "Entraremos em contato em breve"
      });

      setForm((old:any)=>({
        'nmresponsavel':"",
        'nmempresa':"",
        'area':"",
        'logo':"",
        'fone':"",
        'email':"",
        'servicoproduto':opc1[0],
        'outroservicoproduto':"",
        'comentarios':""
      }))

    }catch(e){
      console.log('Error: ', e)
    }
  }

  return (
    <div className="container mt-4 mb-4" >
      <div className="text-center m-4" >
        <p>
        Preencha o formulário, para alinhar os dados. Qualquer dúvida entrar 
        em contato.</p>
      </div>
      <div className="d-flex justify-content-center">
        <div className="col-md-8 col-12">
      <form onSubmit={handleSubmit} >
        <div>
          <label >Nome do responsável:</label>
          <input className="form-control " 
          type="text" name="nmresponsavel"
          value={form.nmresponsavel}
          onChange={onChange}
          placeholder="Ex: Maria de Lurdes"
          />
        </div>
        <br />

        <div>
          <label>Nome da empresa:</label>
          <input className="form-control" 
          type="text" name="nmempresa" 
          value={form.nmempresa}
          onChange={onChange}
          placeholder="Ex: Lojas Maria"
          />
        </div>
        <br />

        <div>
          <label>Área de seguimento:</label>
          <input className="form-control" type="text" 
          name="area"
          value={form.area}
          onChange={onChange}
          placeholder="Ex: Moda"
          />
        </div>
        <br />

        <div>
          <label>Possui Logo:</label>
          <input className="form-control" 
          type="text" name="logo"
          value={form.logo}
          onChange={onChange}
          placeholder="Sim ou não"
          />
        </div>
        <br />
        
        <div>
          <label>Telefone</label>
          <input className="form-control" 
          type="text" name="fone"
          value={form.fone}
          onChange={onChange}
          placeholder="Ex: 81 985349870"
          />
        </div>
        <br />
        
        <div>
          <label>E-mail</label>
          <input className="form-control" 
          type="text" name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Ex: nome23@gmail.com"
          />
        </div>
        <br />

        <div>
          <label>Serviço ou Produto?</label>
          <select className="form-select" name="servicoproduto" id="servicoproduto"
          value={form.servicoproduto}
          onChange={onChange}
          >
            <option value=""></option>
            { opc1.map((opcao)=>(
              <option key={opcao} value={opcao}>{opcao}</option>
            )) }
          </select>
        </div>
        <br />

        <div>
          <label>Outro produto ou serviço</label>
          <input className="form-control" type="text" 
          name="outroservicoproduto"
          value={form.outroservicoproduto}
          onChange={onChange}
          placeholder="Ex: Sandalias, vestidos"
          />
        </div>
        <br />

        <div>
          <label>Comentarios</label>
          <textarea className="form-control" name="comentarios" id="comentarios"
          value={form.comentarios}
          onChange={onChange}
          placeholder="Algo a acrescentar"
          ></textarea>
        </div>

        <button className="mt-4 btn btn-success" type="submit">Enviar</button>
        
      </form>
      </div>
      </div>
    </div>
  );
}
