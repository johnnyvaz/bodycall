import { prisma } from '@/lib/prisma'

export default async function TestDbPage() {
  try {
    // Testar conexão simples
    const userCount = await prisma.systemUser.count()
    
    // Buscar alguns usuários
    const users = await prisma.systemUser.findMany({
      take: 3,
      where: {
        active: 'Y'
      }
    })

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">✅ Conexão com Banco OK!</h1>
        
        <div className="mb-4 p-4 bg-green-100 rounded">
          <p>Total de usuários: <strong>{userCount}</strong></p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Usuários encontrados:</h2>
          {users.map(user => (
            <div key={user.id} className="p-2 border-b">
              <strong>{user.name}</strong> - {user.email}
              {user.functionName && ` (${user.functionName})`}
            </div>
          ))}
        </div>

        <div className="text-sm text-gray-600">
          Docker MySQL rodando na porta 3306 ✅
        </div>
      </div>
    )
  } catch (error) {
    console.error('Erro na conexão:', error)
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-600">❌ Erro na Conexão</h1>
        <div className="bg-red-100 p-4 rounded text-red-800">
          <p>Erro: {error instanceof Error ? error.message : 'Erro desconhecido'}</p>
        </div>
      </div>
    )
  }
}