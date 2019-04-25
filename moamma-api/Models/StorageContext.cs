using Microsoft.EntityFrameworkCore;
using moamma_identity.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace moamma_api.Models
{
    public class StorageContext : DbContext
    {
        public StorageContext(DbContextOptions<StorageContext> options) : base(options) { }

        public DbSet<Article> Article { get; set; }
        public DbSet<FrontAuthor> Author { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<ReplyComment> ReplyComment { get; set; }
        public DbSet<DeletedArticle> DeletedArticle { get; set; }
    }
}
