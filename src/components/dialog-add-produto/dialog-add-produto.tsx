import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storage } from "@/lib/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Produto } from '@/types/types';
import axios from '@/app/axiosConfig';
import { Label } from "../ui/label";

interface DialogAddProductProps {
    onClose: () => void;
    onProductAdded: () => void;
    productToEdit?: Produto;
    categoriaId: number;
}

const DialogAddProduct: React.FC<DialogAddProductProps> = ({ onClose, onProductAdded, productToEdit, categoriaId }) => {
    const [newProduct, setNewProduct] = useState<Omit<Produto, 'id'>>({
        urlImagem: '',
        nome: '',
        descricao: '',
        preco: 0,
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (productToEdit) {
            setNewProduct({
                urlImagem: productToEdit.urlImagem,
                nome: productToEdit.nome,
                descricao: productToEdit.descricao,
                preco: productToEdit.preco,
            });
        }
    }, [productToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Produto) => {
        setNewProduct({
            ...newProduct,
            [field]: e.target.value,
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setNewProduct({
                    ...newProduct,
                    urlImagem: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            setIsUploading(true);
            let imageUrl = newProduct.urlImagem;

            if (imageFile) {
                const storageRef = ref(storage, `produtos/${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(storageRef);
            }

            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            const empresaId = empresaData.id;

            const produto: Omit<Produto, 'id'> = {
                urlImagem: imageUrl,
                nome: newProduct.nome,
                descricao: newProduct.descricao,
                preco: newProduct.preco,
            };

            if (productToEdit) {
                await axios.put(`/empresas/${empresaId}/prateleiras/${categoriaId}/produtos/${productToEdit.id}`, produto);
            } else {
                await axios.post(`/empresas/${empresaId}/prateleiras/${categoriaId}/produtos`, produto);
            }

            onProductAdded(); 
            setIsUploading(false);
            onClose();
        } catch (error) {
            console.error('Erro ao salvar o produto:', error);
            setIsUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dialog-overlay">
            <div className="bg-white p-6 rounded-lg shadow-lg flex w-2/3">
                <div className="w-1/2 pr-4">
                    <h3 className="text-lg font-semibold mb-4">{productToEdit ? "Editar Produto" : "Adicionar Produto"}</h3>
                    <Label>Imagem</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="mb-4"
                    />
                    <Label>Nome</Label>
                    <Input
                        value={newProduct.nome}
                        onChange={(e) => handleChange(e, 'nome')}
                        placeholder="Ex: Pizza de Calabresa"
                        className="mb-4"
                    />
                    <Label>Descrição</Label>
                    <Input
                        value={newProduct.descricao}
                        onChange={(e) => handleChange(e, 'descricao')}
                        placeholder="Ex: Tamanho Grande (8 pedaços)" 
                        className="mb-4"
                    />
                    <Label>Preço Unitário</Label>
                    <Input
                        type="number"
                        value={newProduct.preco}
                        onChange={(e) => handleChange(e, 'preco')}
                        placeholder="Preço Unitário"
                        className="mb-4"
                    />
                    <div className="flex gap-4 mt-4">
                        <Button onClick={handleSave} variant="orange" disabled={isUploading}>
                            {isUploading ? "Salvando..." : "Salvar Produto"}
                        </Button>
                        <Button onClick={onClose} variant="destructive">Cancelar</Button>
                    </div>
                </div>
                <div className="w-1/2 ml-4 shadow-2xl bg-orange-50">
                    <h3 className="text-lg text-slate-400 font-semibold my-4 text-center">Preview do Produto</h3>
                    <div className="flex flex-col items-center">
                        {newProduct.urlImagem ? (
                            <img src={newProduct.urlImagem} alt="Pré-visualização da imagem" className="w-48 h-48 object-cover mb-4" />
                        ) : (
                            <div className="w-48 h-48 bg-gray-200 mb-4 flex items-center justify-center text-gray-500">
                                Sem imagem
                            </div>
                        )}
                        <p className="text-xl font-bold">{newProduct.nome || "Nome do Produto"}</p>
                        <p className="text-sm text-gray-600">{newProduct.descricao || "Descrição do Produto"}</p>
                        <p className="text-2xl text-orange-500 mt-4">{newProduct.preco ? `R$ ${newProduct.preco}` : "Preço"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DialogAddProduct;
