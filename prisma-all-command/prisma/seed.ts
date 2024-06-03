import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    log: [{
        emit:'stdout',
        level:'query'
    }]
})


async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@priams.io',
            Post:{
                create:[{
                    title: 'Hello World',
                    content: 'This is my first post'
                },{
                    title: 'Hello Prisma',
                    content: 'This is my second post'
                }]
            }
        }
    })
    console.log(user)
}

main()