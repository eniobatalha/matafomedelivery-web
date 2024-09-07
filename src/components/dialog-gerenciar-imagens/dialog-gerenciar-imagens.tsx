import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { storage } from "@/lib/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from '@/app/axiosConfig'; // Axios instance

interface DialogGerenciarImagensProps {
    isOpen: boolean;
    onClose: () => void;
    empresaId: number; // ID da empresa
    imgPerfilAtual: string;
    imgCapaAtual: string;
}

const DialogGerenciarImagens: React.FC<DialogGerenciarImagensProps> = ({ isOpen, onClose, empresaId, imgPerfilAtual, imgCapaAtual }) => {
    if (!isOpen) return null;

    const [imgPerfil, setImgPerfil] = useState<File | null>(null);
    const [imgCapa, setImgCapa] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [previewPerfil, setPreviewPerfil] = useState(imgPerfilAtual);
    const [previewCapa, setPreviewCapa] = useState(imgCapaAtual);
    const [nomeRestaurante, setNomeRestaurante] = useState('');
    const [taxaFrete, setTaxaFrete] = useState('');

    // Carregar o nome do restaurante e a taxa de frete a partir do localStorage
    useEffect(() => {
        const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
        if (empresaData) {
            setNomeRestaurante(empresaData.nomeFantasia || 'Nome do Restaurante');
            setTaxaFrete(empresaData.taxaFrete ? `Taxa Mínima Frete: R$ ${empresaData.taxaFrete}` : 'Taxa Mínima Frete: Não definida');
            // Carregar imagens existentes se disponíveis
            setPreviewPerfil(empresaData.imgPerfil || imgPerfilAtual);
            setPreviewCapa(empresaData.imgCapa || imgCapaAtual);
        }
    }, [isOpen, imgPerfilAtual, imgCapaAtual]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'perfil' | 'capa') => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            if (type === 'perfil') {
                setImgPerfil(file);
                setPreviewPerfil(URL.createObjectURL(file)); // Atualiza a pré-visualização
            } else {
                setImgCapa(file);
                setPreviewCapa(URL.createObjectURL(file)); // Atualiza a pré-visualização
            }
        }
    };

    const handleSave = async () => {
        setIsUploading(true);
        try {
            let imgPerfilUrl = imgPerfilAtual;
            let imgCapaUrl = imgCapaAtual;

            if (imgPerfil) {
                const perfilRef = ref(storage, `empresas/${empresaId}/perfil-${imgPerfil.name}`);
                await uploadBytes(perfilRef, imgPerfil);
                imgPerfilUrl = await getDownloadURL(perfilRef);
            }

            if (imgCapa) {
                const capaRef = ref(storage, `empresas/${empresaId}/capa-${imgCapa.name}`);
                await uploadBytes(capaRef, imgCapa);
                imgCapaUrl = await getDownloadURL(capaRef);
            }

            // Faz o patch com as URLs das imagens
            await axios.patch(`/empresas/${empresaId}`, {
                imgPerfil: imgPerfilUrl,
                imgCapa: imgCapaUrl,
            });

            // Atualiza o localStorage com as novas URLs das imagens
            const empresaData = JSON.parse(localStorage.getItem('empresaData') || '{}');
            empresaData.imgPerfil = imgPerfilUrl;
            empresaData.imgCapa = imgCapaUrl;
            localStorage.setItem('empresaData', JSON.stringify(empresaData));

            onClose();
        } catch (error) {
            console.error("Erro ao salvar as imagens:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 dialog-overlay">
            <div className="bg-white p-6 rounded-lg shadow-lg flex w-2/3 max-w-screen-lg mx-auto">
                <div className="w-1/2 pr-4">
                    <h3 className="text-lg font-semibold mb-4">Gerenciar Imagens</h3>
                    <Label>Imagem de Capa</Label>
                    <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'capa')} className="mb-4" />
                    <Label>Imagem de Perfil</Label>
                    <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'perfil')} className="mb-4" />
                    <div className="flex gap-4 mt-4">
                        <Button onClick={handleSave} variant="orange" disabled={isUploading}>
                            {isUploading ? "Salvando..." : "Salvar"}
                        </Button>
                        <Button onClick={onClose} variant="destructive">Cancelar</Button>
                    </div>
                </div>
                <div className="w-1/2 pl-4 shadow-2xl bg-orange-50">
                    <h3 className="text-lg text-slate-400 font-semibold my-4 text-center">Preview das Imagens</h3>
                    <div className="relative">
                        {/* Imagem da Capa */}
                        <img src={previewCapa || "capa-placeholder.png"} alt="Preview da Capa" className="w-full h-32 object-cover" />

                        {/* Imagem de Perfil sobreposta */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8">
                            <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center">
                                <img
                                    src={previewPerfil || "perfil-placeholder.png"}
                                    alt="Preview do Perfil"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-12 mb-4">
                        <p className="text-xl font-bold">{nomeRestaurante}</p> {/* Nome do restaurante */}
                        <p className="text-sm text-gray-600">{taxaFrete}</p> {/* Taxa de frete mínima */}
                    </div>
                </div>
            </div>
        </div>

    );

};

export default DialogGerenciarImagens;
