using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using moamma_api.Models;

namespace moamma_api.Models
{
    public interface IArticleRep
    {
        FrontAuthor LoggedInAuthor { get; set; }

    }
}
