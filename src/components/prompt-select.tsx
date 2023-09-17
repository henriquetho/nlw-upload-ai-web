import { useEffect, useState } from "react";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "../components/ui/select";
import { api } from "@/lib/axios";

interface Prompt {
  id: string
  title: string
  template: string
}

interface PromptSelectProps {
  onPromptSelect: (template: string) => void
}

export function PromptSelect(props: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);

  useEffect(() => {
    api.get('/prompts').then(response => {
      console.log(response.data)
      setPrompts(response.data)
    })
  }, [])

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)
    
    if (!selectedPrompt) {
      return
    }

    props.onPromptSelect(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..."/>
      </SelectTrigger>
      <SelectContent>
        {prompts?.map(prompt => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}