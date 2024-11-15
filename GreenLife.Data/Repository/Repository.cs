using GreeLife.Business.Models;
using GreenLife.Business.Interfaces;
using GreenLife.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace GreenLife.Data.Repository
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : Entity, new()
    {

        protected ApplicationDbContext _ctx;
        protected DbSet<TEntity> DbSet;

        protected Repository(ApplicationDbContext context)
        {
            _ctx = context;
            DbSet = _ctx.Set<TEntity>();
        }


        public async Task Create(TEntity entity)
        {
            DbSet.Add(entity);
            await SaveChanges();
        }


        public async Task<List<TEntity>> GetAll()
        {
            return await DbSet.ToListAsync();
        }

        public async Task<TEntity> GetById(int Id)
        {
            return await DbSet.FindAsync(Id);
        }

        public async Task Remove(int Id)
        {
            var entity = await GetById(Id);
            if (entity != null)
            {
                DbSet.Remove(entity);
                await SaveChanges();
            }
        }

        public async Task<int> SaveChanges()
        {
            return await _ctx.SaveChangesAsync();
        }

        public async Task<IEnumerable<TEntity>> Search(Expression<Func<TEntity, bool>> predicate)
        {
            return await DbSet.AsNoTracking().Where(predicate).ToListAsync();
        }

        public async Task Update(TEntity entity)
        {
            DbSet.Update(entity);
            await SaveChanges();
        }

        public void Dispose()
        {
            _ctx?.Dispose();
        }
    }
}
