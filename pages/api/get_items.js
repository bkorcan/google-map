const faunadb = require('faunadb')
const q = faunadb.query

export default async (req, res) => {
  const min = Number(req.query.min)
  const max = Number(req.query.max)
  const people = Number(req.query.p)

  try {
    const client = new faunadb.Client(
      { secret: process.env.SECRET }
    )
    const data = await client.query(

      // q.Take(take,q.Drop(drop,q.Map(q.Select("data",
      // q.Paginate(q.Match('all_ref_ids_gocek'),{size:2000})),q.Lambda('x',  q.Select("data", q.Get(q.Ref(q.Collection("gocek"), q.Var('x')))) ))))
      q.Map(
        q.Intersection(
          q.Map(
            q.Intersection(
              q.Filter(
                q.Select("data", q.Paginate(q.Match("all_amount_id_kas"), { size: 2000 })),
                q.Lambda("x", q.GTE(q.Select(1, q.Var("x")), 400))
              ),
              q.Filter(
                q.Select("data", q.Paginate(q.Match("all_amount_id_kas"), { size: 2000 })),
                q.Lambda("x", q.LTE(q.Select(1, q.Var("x")), 1200))
              )
            ), q.Lambda('y', q.Select(0, q.Var('y')))
          ),
          q.Map(
            q.Filter(
              q.Select("data", q.Paginate(q.Match("test"), { size: 2000 })),
              q.Lambda("x", q.GTE(q.Select(1, q.Var("x")), 5))
            ), q.Lambda('x', q.Select(0, q.Var('x')))
          )
        ),q.Lambda('c', q.Select('data',  q.Get(q.Ref(q.Collection('kas'),q.Var('c')))))
      )
      // End Of Query
    )

    res.status(200).json(data)

  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
