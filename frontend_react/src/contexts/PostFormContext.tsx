import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

export interface PostChecklistItem {
  id: string;
  descricao: string;
  isCompleted: boolean;
}

export interface PostLinkItem {
  id: string;
  titulo: string;
  url: string;
}

export interface PostFormData {
  titulo: string;
  formato: string;
  etapa: string;
  descricao: string;
  data: string;
  horario: string;
  redacao: string;
  designer: string;
  links: PostLinkItem[];
  checklist: PostChecklistItem[];
}

interface PostFormContextType {
  formData: PostFormData;
  setFormData: React.Dispatch<React.SetStateAction<PostFormData>>;
  updateField: (field: keyof PostFormData, value: any) => void;
  resetForm: () => void;
}

const defaultFormData: PostFormData = {
  titulo: '',
  formato: 'Stories',
  etapa: 'Backlog',
  descricao: '',
  data: '',
  horario: '',
  redacao: '',
  designer: '',
  links: [],
  checklist: [],
};

const PostFormContext = createContext<PostFormContextType | undefined>(undefined);

export function PostFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<PostFormData>(defaultFormData);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
      if (id && id !== 'cadastrar') {
        try {
          const posts = await api.getPosts();
          const post = posts.find(p => p.id === Number(id));
          if (post) {
            setFormData({
              titulo: post.titulo,
              formato: post.tipoPost || 'Stories',
              etapa: post.status || 'Backlog',
              descricao: post.descricao || '',
              data: post.deadline ? post.deadline.split('T')[0] : '',
              horario: post.deadline && post.deadline.includes('T') ? post.deadline.split('T')[1].substring(0, 5) : '',
              redacao: post.responsavelRoteiroId?.toString() || '',
              designer: post.responsavelDesignId?.toString() || '',
              links: [], // API mocked for now
              checklist: post.checklist ? post.checklist.map(c => ({ id: c.id?.toString() || '', descricao: c.descricao, isCompleted: c.isCompleted })) : [],
            });
          }
        } catch (error) {
          console.error("Erro ao carregar o post para edição", error);
        }
      }
    }
    fetchPost();
  }, [id]);

  const updateField = (field: keyof PostFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => setFormData(defaultFormData);

  return (
    <PostFormContext.Provider value={{ formData, setFormData, updateField, resetForm }}>
      {children}
    </PostFormContext.Provider>
  );
}

export function usePostForm() {
  const context = useContext(PostFormContext);
  if (context === undefined) {
    throw new Error('usePostForm must be used within a PostFormProvider');
  }
  return context;
}
