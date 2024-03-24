// test/api.spec.ts
async function mytest() {
  const {expect} = await import('chai')

  describe('hello testind',()=>{
  
    it('check my api',()=>{
      expect(2+4).to.be.equal(6)
    })
  })
  it('check my api',()=>{
    expect(1).to.be.equal(1)
  })
}

mytest()