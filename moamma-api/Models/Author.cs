using Microsoft.AspNetCore.Identity;

namespace moamma_api.Models {
    public class Author : IdentityUser {
        public string NameInPersian { get; set; }
        public string Category { get; set; }
        public Author(){}
        public Author(string userName):base(userName){}
    }

    public class AuthorModel
    {
        
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string NameInPersian { get; set; }
        public string Category { get; set; }

    }

    public class FrontAuthor
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string ImgAddress { get; set; }
        public string Category { get; set; }
    }

    public class ChangePassModel
    {
        public string OldPass { get; set; }
        public string NewPass { get; set; }
        public string RepNewPass { get; set; }
    }

    public class AccSet
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PersianName { get; set; }
        public string Category { get; set; }
    }

    public class ForgotPasModel{
        public string UserName { get; set; }
        public string Email { get; set; }
    }

    public class SuppChangePass {
        public string Id { get; set; }
        public string NewPassword { get; set; }
        public string RepNewPassword { get; set; }
    }
}