// // HuggingFaceService removed. DeepSeek is now used directly in the backend.
//       id: '',
//       name: 'Select Model',
//       description: 'Choose a model to start chatting',
//       type: 'conversational',
//       maxLength: 0,
//       temperature: 0.7
//     },
//     {
//       id: 'deepseek-ai/DeepSeek-R1',
//       name: 'DeepSeek-R1',
//       description: 'DeepSeek R1 model for text generation and conversational AI',
//       type: 'conversational',
//       maxLength: 2048,
//       temperature: 0.7
//     },
//     {
//       id: 'microsoft/DialoGPT-medium',
//       name: 'DialoGPT Medium',
//       description: 'Conversational AI model by Microsoft',
//       type: 'conversational',
//       maxLength: 1000,
//       temperature: 0.7
//     },
//     {
//       id: 'microsoft/DialoGPT-large',
//       name: 'DialoGPT Large',
//       description: 'Large conversational AI model by Microsoft',
//       type: 'conversational',
//       maxLength: 1000,
//       temperature: 0.7
//     },
//     {
//       id: 'facebook/blenderbot-400M-distill',
//       name: 'BlenderBot 400M',
//       description: 'Open-domain conversational AI by Facebook',
//       type: 'conversational',
//       maxLength: 128,
//       temperature: 0.7
//     },
//     {
//       id: 'google/flan-t5-base',
//       name: 'Flan-T5 Base',
//       description: 'Instruction-following model by Google',
//       type: 'text2text-generation',
//       maxLength: 512,
//       temperature: 0.7
//     },
//     {
//       id: 'google/flan-t5-large',
//       name: 'Flan-T5 Large',
//       description: 'Large instruction-following model by Google',
//       type: 'text2text-generation',
//       maxLength: 512,
//       temperature: 0.7
//     },
//     {
//       id: 'bigscience/bloom-560m',
//       name: 'BLOOM 560M',
//       description: 'Multilingual language model',
//       type: 'text-generation',
//       maxLength: 100,
//       temperature: 0.7
//     },
//     {
//       id: 'gpt2',
//       name: 'GPT-2',
//       description: 'OpenAI GPT-2 model',
//       type: 'text-generation',
//       maxLength: 100,
//       temperature: 0.7
//     },
//     {
//       id: 'EleutherAI/gpt-neo-125M',
//       name: 'GPT-Neo 125M',
//       description: 'GPT-Neo model by EleutherAI',
//       type: 'text-generation',
//       maxLength: 100,
//       temperature: 0.7
//     }
//   ]

//   // Generate text using a Hugging Face model
//   async generateText(
//     modelId: string,
//     prompt: string,
//     options: {
//       maxLength?: number
//       temperature?: number
//       topP?: number
//       doSample?: boolean
//     } = {}
//   ): Promise<string> {
//     try {
//       const model = HuggingFaceService.MODELS.find(m => m.id === modelId)
//       if (!model) {
//         throw new Error(`Model ${modelId} not found`)
//       }

//       const {
//         maxLength = model.maxLength || 100,
//         temperature = model.temperature || 0.7,
//         topP = 0.9,
//         doSample = true
//       } = options

//       let response: any

//       switch (model.type) {
//         case 'text-generation':
//           response = await this.hf.textGeneration({
//             model: modelId,
//             inputs: prompt,
//             parameters: {
//               max_new_tokens: maxLength,
//               temperature,
//               top_p: topP,
//               do_sample: doSample,
//               return_full_text: false
//             }
//           })
//           if (response && response.generated_text) {
//             return response.generated_text
//           } else {
//             throw new Error('No response from Hugging Face text-generation API')
//           }

//         case 'text2text-generation':
//           response = await this.hf.textGeneration({
//             model: modelId,
//             inputs: prompt,
//             parameters: {
//               max_new_tokens: maxLength,
//               temperature,
//               do_sample: doSample,
//               return_full_text: false
//             }
//           })
//           if (response && response.generated_text) {
//             return response.generated_text
//           } else {
//             throw new Error('No response from Hugging Face text2text-generation API')
//           }

//         case 'conversational':
//           // For conversational models, we need to format the input differently
//           const formattedPrompt = this.formatConversationalPrompt(prompt)
//           response = await this.hf.textGeneration({
//             model: modelId,
//             inputs: formattedPrompt,
//             parameters: {
//               max_new_tokens: maxLength,
//               temperature,
//               top_p: topP,
//               do_sample: doSample,
//               return_full_text: false
//             }
//           })
//           if (response && response.generated_text) {
//             return response.generated_text
//           } else {
//             throw new Error('No response from Hugging Face conversational API')
//           }

//         default:
//           throw new Error(`Unsupported model type: ${model.type}`)
//       }
//     } catch (error) {
//       // Show the real error in the fallback message
//       console.error('Hugging Face API error:', error)
//       throw new Error(`Hugging Face API error: ${error instanceof Error ? error.message : 'Unknown error'}`)
//     }
//   }

//   // Format prompt for conversational models
//   private formatConversationalPrompt(prompt: string): string {
//     // Add conversation formatting for models like DialoGPT
//     return `User: ${prompt}\nAssistant:`
//   }

//   // Get available models
//   static getAvailableModels(): HuggingFaceModel[] {
//     return this.MODELS
//   }

//   // Get model by ID
//   static getModelById(id: string): HuggingFaceModel | undefined {
//     return this.MODELS.find(model => model.id === id)
//   }

//   // Test model availability
//   async testModel(modelId: string): Promise<boolean> {
//     try {
//       await this.generateText(modelId, 'Hello', { maxLength: 10 })
//       return true
//     } catch (error) {
//       return false
//     }
//   }

//   // Get model info from Hugging Face
//   async getModelInfo(modelId: string) {
//     try {
//       const response = await fetch(`https://huggingface.co/api/models/${modelId}`)
//       if (!response.ok) {
//         throw new Error('Failed to fetch model info')
//       }
//       return await response.json()
//     } catch (error) {
//       console.error('Failed to get model info:', error)
//       return null
//     }
//   }
// } 