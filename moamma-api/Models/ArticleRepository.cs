using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using moamma_api.Models;

namespace moamma_identity.Models
{
    public class ArticleRepository : IArticleRep
    {
        public FrontAuthor LoggedInAuthor { get; set; }

        public ArticleRepository(FrontAuthor user) => LoggedInAuthor = user;
    }
}
