import React, { createContext, useContext, useState, type ReactNode } from 'react';

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
