using GreenLife.Business.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class IdentityApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
{
    public IdentityApplicationDbContext(DbContextOptions<IdentityApplicationDbContext> options)
        : base(options)
    {
    }
}
