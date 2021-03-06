import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0Mzc2MzI4OCwiZXhwIjoxOTU5MzM5Mjg4fQ.YiC7m6vd7UQarZPvOpqGKshax2cDkDFC8rNITvTwes0'; 
const SUPABESE_URL = 'https://lbjzlwfotmcczjtfhjgo.supabase.co';
const supabaseClient = createClient(SUPABESE_URL, SUPABASE_ANON_KEY);

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient.from('mensagens').on('INSERT', (respostaLive) => {
    adicionaMensagem(respostaLive.new);
  }).subscribe();
}

export default function ChatPage() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([
    // {
    //   id: 1,
    //   de: 'natancolen',
    //   texto: ':sticker: https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_4.png',
    // }
  ]);

  React.useEffect(() => {
    supabaseClient.from('mensagens').select('*').order('id', {ascending: false}).then(({data}) => {
      //console.log('Dados da consulta: ', data);
      setListaDeMensagens(data);
    });

    const subscrition = escutaMensagensEmTempoReal((novaMensagem) => {
      console.log('Nova mensagem: ', novaMensagem);
      setListaDeMensagens((valorAtualDaLista) => {
        return [
          novaMensagem,
          ...valorAtualDaLista,
        ]
      });
    });

    return () => {
      subscrition.unsubscribe();
    }
  }, []); 

  /*
    // Usuário
    - Usuário digita o campo textarea
    - Aperta Enter para enviar
    - Tem que adicionar o texto na listagem

    //Dev
    - [X] Campo criado
    - [X] Vamos usar o onChange usar o setState {ter if para que seja enter pra limpar a variável}
    - [X] Lista de messagem

    */

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      //id: listaDeMensagens.length + 1,
      de: usuarioLogado,
      texto: novaMensagem,
    };
    supabaseClient.from('mensagens').insert([
      //Tem que ser um objeto com os MESMO CAMPOS que você escreveu 
      mensagem
    ])
    .then(({ data }) => {
       console.log('Criando mensagem: ', data);
    });

    setMensagem('');
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[550],
        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTutTUdq8ZFERwiOBfnN1DV0rgONAd9vH_nKA&usqp=CAU)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
            }}      
        >
          <MessageList mensagens={listaDeMensagens} />

          {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
            >
            <TextField 
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();

                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}    
            />
            <Button label="Ok"
              onChange={(e) => {
                const valor = e.target.value;
                setMensagem(valor);
              }}
              onClick={(event) => {
                event.preventDefault();
                handleNovaMensagem(mensagem);
                //console.log(event);
              }}
              styleSheet={{
                height: "40px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                color: appConfig.theme.colors.neutrals[200]
              }}
            />
            
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                //console.log('Salva este sticker no banco');
                handleNovaMensagem(':sticker: ' + sticker);
              }}
            />

          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  //console.log("MessageList", props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {/* [Decorarito] */}
            {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
            {/* {mensagem.texto.startsWith(':sticker:')
              ? (
                <Image src={mensagem.texto.replace(':sticker:', '')} />
              ) 
              : (
                  mensagem.texto
            )} */}
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}