import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient({
    log:[{
        emit: 'stdout',
        level: 'query'
    }]
});

async function main1() {
    await prisma.department.create({
        data:{
            name: 'IT',
            employees:{
                create:[
                    {
                        firstName: 'Alice',
                        lastName: 'Smith',
                        phone:'123456',
                        email:''
                    },{
                        firstName: 'Bob',
                        lastName: 'Jones',
                        email:'',
                        phone:'654321',
                    }
                ]
            }
        }
    })
}

async function main2() {
    await prisma.department.create({
        data:{
            name: 'UI',
            employees:{
                createMany: {
                    data: [
                        {
                            firstName: '囡囡',
                            lastName: 'Smith',
                            phone: '123456',
                            email: ''
                        }, {
                            firstName: '贝贝',
                            lastName: 'Jones',
                            email: '',
                            phone: '654321',
                        }
                    ]
                }}
        }
    })
}


async function main3() {
    const res1 = await prisma.department.findUnique({
        where:{
            id:1
        },
        include:{
            employees:true
        }
    })
    console.log(res1)

    const res2 = await prisma.department.findUnique({
        where:{
            id:1
        },
        include:{
            employees:{
                where:{
                    id:1
                }
            }
        }
    })
    console.log(res2)
}


async function main4() {
    const res = await prisma.department.update({
        where: {
            id: 1
        },
        data: {
            name:'销售部',
            employees:{
                // create:[
                //     {
                //         firstName: 'zxp',
                //         lastName: 'pang',
                //         phone:'123456',
                //         email:''
                //     }
                // ]
                // connectOrCreate 第一次是插入，第二次是更新
                connect: {
                    id:4
                }
            }
        },
    })
    console.log(res)
}

async function main5() {
    await prisma.employee.deleteMany({
        where:{
            department:{
                id:2
            }
        }
    })
}

async function main6() {
    // await prisma.$executeRaw`TRUNCATE TABLE Employee`
    const res = await prisma.$queryRaw`SELECT * FROM Department`
    console.log(res)
}

// main1();
// main2()
// main3()
// main4()
// main5()
main6()