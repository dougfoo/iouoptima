import graphene

import iouapp.schema


class Query(iouapp.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
