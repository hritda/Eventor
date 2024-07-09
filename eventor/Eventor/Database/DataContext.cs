using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Eventor.Models;
using Microsoft.EntityFrameworkCore;

namespace Eventor.Database
{
    public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure the many-to-many relationship
        modelBuilder.Entity<User>()
            .HasMany(u => u.UserTypes)
            .WithMany(ut => ut.Users);

        modelBuilder.Entity<Event>()
        .HasOne(u=>u.OrganisedBy)
        .WithMany().IsRequired();
           
    }
        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events {get;set;}
        public DbSet<UserType> UserTypes { get; set; }
    }
}