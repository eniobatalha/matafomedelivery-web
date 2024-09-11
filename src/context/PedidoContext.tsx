import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

// Cria o contexto para pedidos
const PedidoContext = createContext<any>(null);

export const usePedidoContext = () => {
  return useContext(PedidoContext);
};

export const PedidoProvider = ({ children }: { children: React.ReactNode }) => {
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [filaPedidos, setFilaPedidos] = useState<any[]>([]);
  const stompClientRef = useRef<any>(null); // Mantém a referência do StompClient

  useEffect(() => {
    const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
    const empresaId = empresaData?.id;

    if (!empresaId) return;

    // Inicializa o WebSocket
    const socket = new SockJS("https://matafome-api.whiteglacier-7456d729.brazilsouth.azurecontainerapps.io/ws");
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/pedidoEmpresa/${empresaId}`, (message) => {
        const novoPedido = JSON.parse(message.body);
        setFilaPedidos((prevFila) => [...prevFila, novoPedido]);
      });
    });

    // Cleanup: Desconecta o WebSocket quando o componente for desmontado
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
        stompClientRef.current = null;
      }
    };
  }, []); // O useEffect depende apenas do componente ser montado/desmontado

  return (
    <PedidoContext.Provider
      value={{ pedidos, filaPedidos }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
