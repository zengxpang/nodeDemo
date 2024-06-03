import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient(
    {
        log: [
            {
                emit: 'event',
                level: 'query',
            },
        ],
    }
)

async function main() {
  // await prisma.user.create({
  //   data: {
  //       name: 'Alice',
  //     email: 'zengxpang@163.com',
  //   }
  // })
  //
  //   await prisma.user.create({
  //       data: {
  //           name: 'Bob',
  //           email: 'blob@163.com'
  //       }
  //   })
  //
  //   const allUsers = await prisma.user.findMany()
  //   console.log(allUsers)

    // const user = await prisma.user.create({
    //     data: {
    //         name: 'Bob',
    //         email: 'bob@prisma.io',
    //         posts: {
    //             create: [
    //                 {
    //                     title: 'Hello World',
    //                     published: true
    //                 },
    //                 {
    //                     title: 'My second post',
    //                     content: 'This is still a draft'
    //                 }
    //             ],
    //         },
    //     },
    // })
    // console.log(user)

    const usersWithPosts = await prisma.user.findMany({
        include: {
            posts: true,
        },
    })
    console.dir(usersWithPosts, { depth: null })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })