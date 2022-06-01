const faunadb = require('faunadb')
const q = faunadb.query

export default async (req, res) => {

    // const{ id, name, price } = req.body

    const client = new faunadb.Client({ secret: process.env.SECRET })

    try {
        await client.query(

            // 
            q.Update(q.Ref(q.Collection("kas"), "330286436829889100"), {
                data: {
                    date: q.Difference(
                        q.Select(
                            "date",
                            q.Select("data", q.Get(q.Ref(q.Collection("kas"), "330286436829889100")))
                        ),
                        q.Map(
                            q.Select(
                                "array",
                                q.Select(
                                    "data",
                                    q.Get(
                                        q.Ref(
                                            q.Collection("arrays"),
                                            q.TimeDiff(q.TimeSubtract(q.Date("2022-06-05"), 1, 'days'), q.Date("2022-06-18"), "days")
                                        )
                                    )
                                )
                            ),
                            q.Lambda("x", [q.TimeAdd(q.TimeSubtract(q.Date("2022-06-05"), 1, 'days'), q.Var("x"), "days"), 100])
                        )
                    )
                }
            })
            //   

        )

        res.status(200).end()

    } catch (e) {

        res.status(500).json({ error: e.message })

    }
}