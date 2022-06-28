const faunadb = require('faunadb')
const q = faunadb.query

export default  async (req, res)=>{

    const{ ci,co, pr, v } = req.body

    const client = new faunadb.Client({ secret:process.env.SECRET })

    try {
        await client.query(

            q.Update(q.Ref(q.Collection("kas"), v), {
                data: {
                  date: q.Append( q.Map(
                    
                    q.Select(
                      "array",
                      q.Select(
                        "data",
                        q.Get(
                          q.Ref(
                            q.Collection("arrays"),
                            q.TimeDiff(q.TimeSubtract(q.Date(ci),1,'days'), q.Date(co), "days")
                          )
                        )
                      )
                    ),
              
                    q.Lambda("x", [q.TimeAdd(q.TimeSubtract(q.Date(ci),1,'days'), q.Var("x"), "days"), pr])
                  ),
                  q.Select(
                      "date",
                      q.Select("data", q.Get(q.Ref(q.Collection("kas"), v)))
                    )
                )
                }
              })

        )

        res.status(200).end()
        
    } catch (e) {

        res.status(500).json({ error:e.message })
        
    }
}