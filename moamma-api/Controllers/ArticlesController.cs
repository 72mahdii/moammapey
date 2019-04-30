using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using moamma_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace moamma_api.Controllers {

    [Authorize(Policy = "moamma_spa")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ArticlesController : Controller{

        private UserManager<Author> _userManager;
        private StorageContext _storageContext;
        private IArticleRep _articleRepository;
        private IHostingEnvironment _host;

        public ArticlesController(
        UserManager<Author> userMng,
            StorageContext strgContext,
            IArticleRep artRep,
            IHostingEnvironment hst)
        {
            _userManager = userMng;
            _storageContext = strgContext;
            _articleRepository = artRep;
            _host = hst;    
        }

        /*___Create Article___*/
        #region Create Article 
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<string>> CreateArticle([FromBody]ArticleModel article)
        {
            Author author = await _userManager.GetUserAsync(HttpContext.User);
            Article createdArticle = new Article
            {
                Title = article.Title,
                Category = article.Category,
                Tag = article.Tag,
                Content = article.Content,
                Summary = article.Summary,
                Archive = article.Archive,
                CrtDate = DateTime.Now,
                AuthorId = author.Id,
                Likes = 0,
            };
            await _storageContext.Article.AddAsync(createdArticle);
            await _storageContext.SaveChangesAsync();
            return Json("ok");
        }
        #endregion


        /*___Fetch Articles___*/
        #region FetchArticles

        [HttpGet]
        [Route("[action]")]
        public async Task<IEnumerable<Article>> FetchArticles()
        {
            try
            {
                Author author = await _userManager.GetUserAsync(HttpContext.User);
                List<Article> articles = new List<Article>();
                foreach (Article article in _storageContext.Article.Include(a => a.Comments))
                {
                    if (article.AuthorId == author.Id)
                    {
                        articles.Add(article);
                    }
                }
                return articles;
            }
            catch (Exception e)
            {

                return null;
            }
            
        }

        #endregion
    }
}