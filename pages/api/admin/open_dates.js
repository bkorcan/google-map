import { Var } from 'faunadb'

const faunadb = require('faunadb')
const q = faunadb.query

export default async (req, res) => {
 
    const { ci, co } = req.body

    const client = new faunadb.Client({ secret: process.env.SECRET })
    try {
        await client.query(
            // 
            q.Update(
                q.Ref(q.Collection("kas"), "330286436829889100"), {
                data: {
                    date:
                        q.Difference(
                            q.Select(
                                "date",
                                q.Select("data", q.Get(q.Ref(q.Collection("kas"), "330286436829889100")))
                            ),
                            q.Filter(
                                q.Select(
                                    "date",
                                    q.Select("data", q.Get(q.Ref(q.Collection("kas"), "330286436829889100")))
                                ),
                                q.Lambda("x", q.And(q.GTE(q.Select(0, q.Var("x")), q.Date(ci)), q.LTE(q.Select(0, q.Var("x")), q.Date(co))))
                            )
                        )
                }
            }
        )
            //   
        )

        res.status(200).end()

    } catch (e) {

        res.status(500).json({ error: e.message })

    }
}