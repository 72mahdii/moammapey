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

        /*___Edit Article___*/
        #region EditArticle
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<string>> EditArticle([FromBody]Article article)
        {
            try
            {
                Article oldArticle = _storageContext.Article.FirstOrDefault(a => a.Id == article.Id);
                oldArticle.Category = article.Category;
                oldArticle.Tag = article.Tag;
                oldArticle.Summary = article.Summary;
                oldArticle.Content = article.Content;
                oldArticle.Title = article.Title;
                oldArticle.Archive = article.Archive;
                _storageContext.Article.Update(oldArticle);
                await _storageContext.SaveChangesAsync();
                return Json("ok");
            }
            catch (Exception e)
            {

                return Json(e.Message);
            }
            
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
                return articles.OrderByDescending(article => article.CrtDate);
            }
            catch (Exception e)
            {

                return null;
            }
            
        }

        #endregion

        /*___Fetch Trashes___*/
        #region FetchTrashes
        [HttpGet]
        [Route("[action]")]
        public IEnumerable<DeletedArticle> FetchTrashes()
        {
            return this._storageContext.DeletedArticle.ToList();
        }
        #endregion

        /*___Trash Article___*/
        #region TrashArticle

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<string>> TrashArticle([FromBody]Article art)
        {
            try
            {
                Author author = await _userManager.GetUserAsync(HttpContext.User);
                Article article = _storageContext.Article.FirstOrDefault(a => a.Id == Convert.ToInt64(art.Id));
                DeletedArticle deletedArticle = new DeletedArticle
                {
                    Title = article.Title,
                    Category = article.Title,
                    Tag = article.Tag,
                    AuthorId = author.Id,
                    CrtDate = article.CrtDate,
                    Summary = article.Summary,
                    Content = article.Content,
                };
                await _storageContext.DeletedArticle.AddAsync(deletedArticle);
                _storageContext.Article.Remove(article);
                await _storageContext.SaveChangesAsync();
                return Json("ok");
            }
            catch (Exception e)
            {

                return Json(e.Message);
            }
            
        }

        #endregion

        /*___Erase Article___*/
        #region EraseArticle

        [HttpPost]
        [Route("[action]")]
        public ActionResult<string> EraseArticle([FromBody]string id) {
            try
            {
                DeletedArticle dArticle = _storageContext.DeletedArticle.FirstOrDefault(a => a.Id == Convert.ToInt64(id));
                _storageContext.DeletedArticle
                    .Remove(dArticle);
                _storageContext.SaveChanges();
                return Json("ok");
            }
            catch (Exception e)
            {

                return Json(e.Message);
            }
        }

        #endregion

        /*___Return Article___*/
        #region RetArticle
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<string>> RetArticle([FromBody]DeletedArticle article)
        {
            try
            {
                _storageContext.DeletedArticle.Remove(article);
                Author author = await _userManager.GetUserAsync(HttpContext.User);
                Article createdArticle = new Article
                {
                    Title = article.Title,
                    Category = article.Category,
                    Tag = article.Tag,
                    Content = article.Content,
                    Summary = article.Summary,
                    Archive = true,
                    CrtDate = DateTime.Now,
                    AuthorId = author.Id,
                    Likes = 0,
                };
                await _storageContext.Article.AddAsync(createdArticle);
                await _storageContext.SaveChangesAsync();
                return Json("ok");
            }
            catch (Exception e)
            {

                return Json(e.Message);
            }
            
        }

        #endregion
    }
}