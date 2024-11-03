using AuctionService.Entities;

namespace AuctionService.UnitTests;

public class AuctionEntityTests
{
    [Fact]
    //Method_Scenario_Expected
    public void HasReservePrice_ReservePriceGreaterThanZero_True()
    {
        //arange
        var  auction = new Auction{Id = Guid.NewGuid(), ReservePrice = 10};

        //act
        var result = auction.HasReservePrice();

        //assert
        Assert.True(result);
    }

    [Fact]
    public void HasReservePrice_ReservePriceGreaterIsZero_False()
    {
        //arange
        var  auction = new Auction{Id = Guid.NewGuid(), ReservePrice = 0};

        //act
        var result = auction.HasReservePrice();

        //assert
        Assert.False(result);
    }
}