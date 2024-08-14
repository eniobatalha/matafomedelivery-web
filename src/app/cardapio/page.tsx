"use client";

import React, { useState, useRef } from "react";
import { MainNav } from "@/components/main-nav/main-nav";
import { UserNav } from "@/components/user-nav/user-nav";
import {  Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs";

const Cardapio = () => {
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [price, setPrice] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const handlePriceClick = () => {
    setShowPriceInput(true);
  };

  const handlePriceChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPrice(event.target.value);
  };

  const handleCancel = () => {
    setShowPriceInput(false);
    setPrice("");
    setSelectedFile(null);
  };

  const handleSubmit = () => {
    // Lógica para enviar os dados
    console.log("Preço:", price);
    console.log("Arquivo:", selectedFile);
    handleCancel();
  };

  return (

    <>
      <div className="mb-8">
        <div className="flex h-16 items-center px-4 bg-orange-500">
          <img
            src="/img/LogoNome.png"
            alt="Logo Nome Mata Fome Delivery"
            className="w-32 h-auto ml-4 mr-8"
          />
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-8">
            <UserNav />
          </div>
        </div>
      </div>

      <div className="flex justify-between p-8">
        <h2 className="text-3xl font-bold tracking-tight text-orange-500">
          CARDÁPIO
        </h2>
      </div>
      <div className="px-8 mb-8">
                        <div className="mb-4">
                            <Tabs defaultValue="todos" className="space-y-4">
                                <TabsList className='w-auto'>
                                  <TabsTrigger value="empreparo">
                                        Adicionar Cardapio
                                    </TabsTrigger>
                                    <TabsTrigger value="ementrega">
                                        Listar Cardapio
                                    </TabsTrigger>
                                   
                                </TabsList>
                            </Tabs>
                        </div>
        </div>
      <div className="flex justify-center">
        <div className="flex space-x-8">
          <div
            onClick={handleAddPhotoClick}
            className="w-1/3 p-8 border border-red-500 shadow-md text-center cursor-pointer"
          >
            Adicionar foto
          </div>
          <div
            onClick={handlePriceClick}
            className="w-1/3 p-8 border border-red-500 shadow-md text-center cursor-pointer"
          >
            Adicionar preço
          </div>
          <div className="w-1/3 p-8 border border-red-500 shadow-md text-center">
            Selecionar Categoria
          </div>
        </div>
      </div>

      {/* Input de arquivo oculto */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileChange(event)}
        className="hidden"
      />

      {showPriceInput && (
        <div className="flex justify-center p-8">
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            placeholder="Digite o preço"
            className="border border-gray-300 p-2 rounded"
          />
        </div>
      )}

      {selectedFile && (
        <div className="flex flex-col items-center p-8">
          <img
            src={selectedFile}
            alt="Foto selecionada"
            className="w-1/3 h-auto mb-4"
          />
          <div className="text-lg font-bold mb-4">{price ? `Preço: R$ ${price}` : "Preço: Não definido"}</div>
          <div className="flex space-x-4">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded"
            >
              Enviar
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white p-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cardapio;
