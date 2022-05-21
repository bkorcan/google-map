const faunadb = require('faunadb')
const q = faunadb.query

export default async (req, res) => {
    const take = Number(req.query.t)
    const drop = Number(req.query.d)
    console.log(drop)

    try {
        const client = new faunadb.Client(
            { secret: process.env.SECRET }
        )
        const data = await client.query(
            // q.Take(take,q.Drop(drop,q.Map(q.Select("data",
            // q.Paginate(q.Match('all_ref_ids_gocek'),{size:2000})),q.Lambda('x',  q.Select("data", q.Get(q.Ref(q.Collection("gocek"), q.Var('x')))) ))))
            q.Map(
                q.Map(
                    q.Intersection(
                    q.Filter(
                      q.Select("data", q.Paginate(q.Match("all_amount_id_kas"), { size: 2000 })),
                      q.Lambda("x", q.GTE(q.Select(1, q.Var("x")), take))
                    ),
                    q.Filter(
                      q.Select("data", q.Paginate(q.Match("all_amount_id_kas"), { size: 2000 })),
                      q.Lambda("x", q.LTE(q.Select(1, q.Var("x")), drop))
                    )
                  ), q.Lambda('y', q.Get(q.Ref( q.Collection('kas'), q.Select(0,q.Var('y')) )))
                  ),q.Lambda('z',q.Select('data',q.Var('z')))
                )
        )

        res.status(200).json(data)

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}
