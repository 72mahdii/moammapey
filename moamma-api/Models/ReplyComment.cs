using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace moamma_api.Models
{
    public class ReplyComment
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Text { get; set; }
        public bool Approved { get; set; }
        public bool Vip { get; set; }
        public long CommentId { get; set; }
        //public Comment Comment { get; set; }
    }

    public class SendReply
    {
        public string Id { get; set; }
        public string Text { get; set; }
    }
}
