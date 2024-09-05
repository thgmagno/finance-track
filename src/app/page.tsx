import { ButtonGetFile } from '@/components/buttonGetFile'
import { ButtonSubmit } from '@/components/buttonSubmit'
import { ConfigType } from '@/types/fileManager'

export default function Home() {
  const config: ConfigType = { year: 2024, type: 'receipt', month: 8 }
  const data = { hash: 'Ok ✅' }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-medium text-slate-500">Finance Track</h1>
      <div className="rounded-md bg-slate-200 p-6">
        <h2>Create an example of file</h2>
        <p>
          <b>Year:</b> 2024
        </p>
        <p>
          <b>Type:</b> Receipt
        </p>
        <p>
          <b>Month:</b> August
        </p>
        <ButtonSubmit data={data} config={config} />
      </div>
      <ButtonGetFile />
    </main>
  )
}
