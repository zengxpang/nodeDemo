import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient({
    log:[
        {
            emit: "stdout",
            level: "query"
        }
    ]
});

async function main1() {
    // findUniqueOrThrow 没找到会报错
    const aaa = await prisma.aaa.findUnique({
        where: {
            id: 10
        }
    })

    console.log(aaa)

    const bbb = await prisma.aaa.findUnique({
        where: {
            email: 'bbb@xx.com'
        },
        select:{
            id:true,
            email:true,
        }
    })

    console.log(bbb)

}




async function main2() {
    // count 返回具体的条数 prisma.aaa.count
   const res = await prisma.aaa.count({
       where:{
           email:{
               contains: 'xx'
           }
       },
       // select:{
       //     name:true
       // },
       orderBy:{
           name:'desc'
       },
       skip:2, // 第三条开始
       take:3 // 3条数据
   })
    console.log(res)
}

async function main3() {
    // findFirstOrThrow 没找到会报错
    const res = await prisma.aaa.findFirst({
        where:{
            email:{
                contains: 'xx',
                // endsWith:'',
                // equals:'',
                // gt:'', // 大于
                // gte:'', // 大于等于
                // lt:'', // 小于
                // lte:'', // 小于等于
                // in:[''],
                // notIn:[''],
                // not:'', // 不等于
                // startsWith:'',
            }
        },
        select:{
            name:true
        },
        orderBy:{
            name:'desc'
        },
        skip:2, // 第三条开始
        take:3 // 3条数据
    })
    console.log(res)
}


async function main4() {
    // createMany 一次创建多条数据
    const res = await prisma.aaa.create({
        data:{
            name:'kkk',
            email:'kk@xx.com'
        },
        select:{
            email:true
        }
    })
    console.log(res)
}

async function main5(){
    // const res = await prisma.aaa.update({
    //     where: {
    //         id:3
    //     },
    //     data: {
    //        email:'333@xx.com'
    //     },
    //     select:{
    //         id:true,
    //         email:true
    //     }
    // })
    const res = await prisma.aaa.updateMany({
        where:{
            email:{
                contains:'xx.com'
            }
        },
        data:{name:'666'}
    })
    console.log(res)
}


async function main6(){
    // upsert = update + insert
    // 第一次跑的时候是insert，第二次跑的时候就是update
    const res = await prisma.aaa.upsert({
        create: {
            id:11,
            email:'11@xx.com',
            name:'111'
        },
        update: {
            email:'11@yy.com'
        },
        where: {
            id:11
        }
    })
    console.log(res)
}

async function main7(){
    await prisma.aaa.delete({
        where:{
            id:1
        }
    })
    await prisma.aaa.deleteMany({
        where:{
            id:{
                in:[2,3]
            }
        }
    })
}

async function main8(){
    const res = await prisma.aaa.aggregate({
        where:{
            email:{
                contains:'xx.com'
            }
        },
        _count:{
            _all:true
        },
        _max:{
            age:true
        },
        _min: {
            age: true
        },
        _avg: {
            age: true
        }
    })
    console.log(res)
}

async function main9(){
    const res = await prisma.aaa.groupBy({
        by:['email'], //按照email分组
        _count:{
            _all:true
        },
        _sum:{
            age:true
        },
        having:{
            age:{
                _avg:{
                    gt:5
                }
            }
        }
    })
    console.log(res)
}

// main1()
// main2()
// main3()
// main4()
// main5()
// main6()
// main7()
// main8()
main9()