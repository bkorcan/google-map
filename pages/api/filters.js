const faunadb = require('faunadb')
const q = faunadb.query

export default async (req, res) => {
    const { v } = req.query
    // console.log(v)

    try {

        const client = new faunadb.Client(
            { secret: process.env.SECRET }
        )
        const data = await client.query(
            // Query Goes here
            q.Map(
                q.Filter(
                    q.Map(
                        q.Map(
                            q.Filter(
                                q.Map(
                                    q.Map(
                                        q.Select(
                              "data",
                              q.Take(5 , q.Paginate(q.Match("all_ref_ids_kas"), { size: 2000 }))
                            ),
                            q.Lambda("x", q.Select("data", q.Get(q.Ref(q.Collection("kas"), q.Var("x")))))
                          ),
                          q.Lambda("x", [
                            q.Select(
                              "amount",
                              q.Select("rate", q.Select("pricingQuote", q.Var("x")))
                            ),
                            q.Var("x")
                          ])
                        ),
                        q.Lambda(
                          "x",
                          q.And(q.LT(q.Select(0, q.Var("x")), 16800), q.GT(q.Select(0, q.Var("x")), 0))
                        )
                      ),
                      q.Lambda("x", [
                        q.Select("personCapacity", q.Select("listing", q.Select(1, q.Var("x")))),
                        q.Var("x")
                      ])
                    ),
                    q.Lambda("x", [q.Select(0, q.Var("x")), q.Var("x")])
                  ),
              
                  q.Lambda("x", q.LT(q.Select(0, q.Var("x")), 34))
                ),
                q.Lambda("x", [q.Select("date", q.Select(1, q.Select(1, q.Select(1, q.Var("x"))))),[ q.Select(1, q.Select(1, q.Select(1, q.Var("x"))))]])
              )

            //   
        )

        res.status(200).json(data)

    } catch (e) {
         res.status(500).json({error:e.message})
    }
}