package com.lostandfound.LostAndFound.Item;

import static org.mockito.Mockito.when;

import com.lostandfound.LostAndFound.Item.entities.Item;
import com.lostandfound.LostAndFound.Item.repo.ItemRepository;
import com.lostandfound.LostAndFound.Item.service.impl.ItemSeviceImpl;
import java.util.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

@ExtendWith(MockitoExtension.class)
public class ItemServiceTest {

  private final Double LONGITUDE = 12.123;
  private final Double LATITUDE = 12.123;
  Date date = new Calendar.Builder().setDate(2023, 11, 2).build().getTime();
  private Item foundItem;
  private Item lostItem;
  @Mock private ItemRepository itemRepository;
  @InjectMocks private ItemSeviceImpl itemService;

  @BeforeEach
  public void setUp() {
    foundItem = new Item();
    foundItem.setId("123");
    foundItem.setTitle("iPhone 12");
    foundItem.setDescription("Black iPhone 12");
    foundItem.setCreatedBy("test@gmail.com");
    foundItem.setSensitive(false);
    foundItem.setPostedAt(date);
    foundItem.setUpdatedDate(date);
    foundItem.setImage(new ArrayList<>());
    foundItem.setFoundItem(true);
    foundItem.setCategory("Electronics");
    foundItem.setClaimRequested(new HashMap<>());
    foundItem.setClaimRequestAccepted(new HashMap<>());
    foundItem.setClaimRejected(new HashMap<>());
    foundItem.setLocation(new GeoJsonPoint(LONGITUDE, LATITUDE));

    lostItem = new Item();
    lostItem.setId("1a2b3c");
    lostItem.setTitle("iPhone 12");
    lostItem.setDescription("Black Color iPhone 12");
    lostItem.setCreatedBy("losttest@gmail.com");
    lostItem.setSensitive(false);
    lostItem.setPostedAt(date);
    lostItem.setUpdatedDate(date);
    lostItem.setImage(new ArrayList<>());
    lostItem.setFoundItem(false);
    lostItem.setCategory("Electronics");
    lostItem.setClaimRequested(new HashMap<>());
    lostItem.setClaimRequestAccepted(new HashMap<>());
    lostItem.setClaimRejected(new HashMap<>());
    lostItem.setLocation(new GeoJsonPoint(LONGITUDE, LATITUDE));
  }

  @Test
  public void testGetRequestRaisedItemsByUserIdSuccess() {
    String userId = "losttest@gmail.com";
    boolean isFoundItem = true;

    foundItem.getClaimRequested().put(lostItem.getId(), lostItem.getCreatedBy());
    when(itemRepository.findAllByFoundItem(isFoundItem)).thenReturn(List.of(foundItem, lostItem));

    List<Item> expectedItems = itemService.getRequestRaisedItemsByUserId(userId);

    Item firstItem = expectedItems.get(0);

    Assertions.assertEquals(firstItem.getClaimRequested().get(lostItem.getId()), userId);
    Assertions.assertEquals(firstItem, foundItem);
  }
}
