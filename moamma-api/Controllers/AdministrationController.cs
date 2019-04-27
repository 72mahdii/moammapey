using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using moamma_api.Models;

namespace moamma_api.Controllers{

    [Authorize(Policy = "moamma_spa")]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AdministrationController : Controller {

        /* Conxtructor and Private property */
        #region ConstructorAndProperties

        private UserManager<Author> _userManager;
        private SignInManager<Author> _signInManager;
        private StorageContext _storageContext;
        private IArticleRep _articleRepository;
        private IHostingEnvironment _host;
        private IPasswordValidator<Author> _passwordValidator;
        private IPasswordHasher<Author> _passwordHasher;
        private readonly string[] ACCEPTED_FILE_TYPES = new[] { ".jpg", ".jpeg", ".png" };

        public AdministrationController(
            UserManager<Author> userMng,
            SignInManager<Author> signInMng,
            StorageContext strgContext,
            IArticleRep artRep,
            IHostingEnvironment hst,
            IPasswordValidator<Author> pswVld,
            IPasswordHasher<Author> pswHs
            )
        {
            _userManager = userMng;
            _signInManager = signInMng;
            _storageContext = strgContext;
            _articleRepository = artRep;
            _host = hst;
            this._passwordValidator = pswVld;
            this._passwordHasher = pswHs;

        }
        #endregion
       

        [HttpPost("[action]"), DisableRequestSizeLimit]
        public ActionResult UploadImage()
        {
            try
            {
                var file = Request.Form.Files[0];
                string folderName = "author-images";
                string webRootPath = _host.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                if (!Directory.Exists(newPath))
                {
                    Directory.CreateDirectory(newPath);
                }
                if (file.Length > 0)
                {
                    string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(newPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
                return Json("Upload Successful.");
            }
            catch (System.Exception ex)
            {
                return Json("Upload Failed: " + ex.Message);
            }
        }
    }
}