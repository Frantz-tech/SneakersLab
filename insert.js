import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Insertion d'un badge
  const badge = await prisma.badge.create({
    data: {
      name: 'Influenceur',
      icon: '🔥'
    }
  })

  // 2. Insertion d'un utilisateur lié au badge
  const user = await prisma.user.create({
    data: {
      userName: 'jdoe',
      firstName: 'John',
      dateNaissance: new Date('1990-05-20'),
      email: 'johndoe@example.com',
      password: 'supersecurepassword',
      pseudo: 'johnnyD',
      profilPic: 'https://example.com/profil.jpg',
      expertise: 'Développeur Web',
      bio: 'Passionné par le web et la tech.',
      badgeId: badge.id
    }
  })

  // 3. Insertion d'un groupe
  // const group = await prisma.group.create({
  //   data: {
  //     name: 'Développeurs Full Stack',
  //     type: 'Public',
  //     nbMembres: 1,
  //     maxMembres: 10,
  //     adminId: user.id
  //   }
  // })

  // // 4. Insertion d'une liaison UsersGroup
  // const userGroup = await prisma.usersGroup.create({
  //   data: {
  //     membreId: user.id,
  //     groupId: group.id
  //   }
  // })

  console.log('✔️ Données insérées avec succès')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors de l\'insertion :', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
